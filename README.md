
# Project Title

A brief description of what this project does and who it's for

technologies used:

Typescript
### Frontend:
1) nextjs
2) heroui for CSS
3) react-hook-form
4) tanstack query
5) axios
6) tiptap text editor
7) Zod validation

### Backend
1) Mongoose
2) Zod validation
3) Meilisearch
4) Cloudinary for images


#!/bin/bash

# === Argument Parsing ===
usage() {
  echo "Usage: $0 <submissions_dir> [--test-dir=<test_dir>] [--answer-dir=<answer_dir>]"
  exit 1
}

[[ $# -lt 1 ]] && usage

submissions_dir="$1"
shift

test_dir="tests"
answer_dir="answers"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --test-dir=*) test_dir="${1#*=}" ;;
    --answer-dir=*) answer_dir="${1#*=}" ;;
    *) echo "Unknown option: $1" && usage ;;
  esac
  shift
done

echo "$submissions_dir", "$test_dir",  "$answer_dir"

# === task A: Extracting and organizing submissions ===

cd "$submissions_dir" || { echo "❌ Submissions directory not found: $submissions_dir"; exit 1; }

for zip in *.zip; do
  student_name=$(basename "$zip" .zip | sed -E 's/_?[0-9]{7}$//')
  student_id=$(basename "$zip" .zip | grep -oE '[0-9]{7}$')

  unzip -q "$zip" -d "${zip%.zip}"

  if [[ -n "$student_name" && -n "$student_id" ]]; then
    echo "$student_name" > "${zip%.zip}/name.txt"
  fi
done

cd ..

target_dir="targets"
declare -A lang_map=( ["c"]="C" ["cpp"]="C++" ["py"]="Python" ["java"]="Java" )

for lang in "${lang_map[@]}"; do
  echo "hello o o $lang", "$target_dir/$lang"
  mkdir -p "$target_dir/$lang"
done

for folder in "$submissions_dir"/*/; do
  if [[ -d "$folder" ]]; then
    student_id=$(basename "$folder" | grep -oE '[0-9]{7}$')
    file=$(find "$folder" -type f \( -iname "*.c" -o -iname "*.cpp" -o -iname "*.py" -o -iname "*.java" \) | head -n 1)

    if [[ -n "$file" ]]; then
      ext="${file##*.}"
      ext_lower=$(echo "$ext" | tr '[:upper:]' '[:lower:]')
      lang="${lang_map[$ext_lower]}"

      if [[ -n "$lang" && -n "$student_id" ]]; then
        dest="$target_dir/$lang/$student_id"
        mkdir -p "$dest"
        cp "$folder/name.txt" "$dest/name.txt" 2>/dev/null

        if [[ "$ext_lower" == "java" ]]; then
          cp "$file" "$dest/Main.java"
        else
          cp "$file" "$dest/main.$ext_lower"
        fi

        echo "✅ $file → $dest/main.$ext_lower"
      else
        echo "❌ Unknown extension or student ID missing in folder: $folder"
      fi
    else
      echo "⚠️  No source file found in $folder"
    fi
  fi
done

# === task B: compile, run, and test ===

languages=("C" "C++" "Java" "Python")
result_csv="targets/result_primary.csv"

echo "student_id,student_name,language,matched,unmatched,line_count,comment_count,function_count" > "$result_csv"

for lang in "${languages[@]}"; do
  for student_path in targets/$lang/*; do
    [[ ! -d "$student_path" ]] && continue

    student_id=$(basename "$student_path")
    src_file="$student_path/main"
    matched=0
    unmatched=0

    if [[ -f "$student_path/name.txt" ]]; then
      student_name=$(<"$student_path/name.txt")
    else
      student_name="$student_id"
    fi

    echo "🔍 Processing $lang - $student_name ($student_id)"

    case $lang in
      C)
        gcc "${src_file}.c" -o "${student_path}/main.out"
        [[ $? -ne 0 ]] && echo "❌ Compilation failed for $student_id in $lang" && continue
        executable="${student_path}/main.out"
        comment_symbol="//"
        source_file="${src_file}.c"
        ;;
      C++)
        g++ "${src_file}.cpp" -o "${student_path}/main.out"
        [[ $? -ne 0 ]] && echo "❌ Compilation failed for $student_id in $lang" && continue
        executable="${student_path}/main.out"
        comment_symbol="//"
        source_file="${src_file}.cpp"
        ;;
      Java)
        javac "${src_file}.java" -d "$student_path"
        [[ $? -ne 0 ]] && echo "❌ Compilation failed for $student_id in $lang" && continue
        executable=(java -cp "${student_path}" Main)
        comment_symbol="//"
        source_file="${src_file}.java"
        ;;
      Python)
        executable=(python3 "${src_file}.py")
        comment_symbol="#"
        source_file="${src_file}.py"
        ;;
      *)
        echo "⚠️ Unsupported language: $lang"
        continue
        ;;
    esac

    for i in {1..5}; do
      test_input="$test_dir/test${i}.txt"
      expected_output="$answer_dir/ans${i}.txt"
      output_file="${student_path}/out${i}.txt"

      echo "▶️ Running test $i for $student_id"

      if [[ "$lang" == "Java" || "$lang" == "Python" ]]; then
        "${executable[@]}" < "$test_input" > "$output_file" 2>&1
      else
        "$executable" < "$test_input" > "$output_file" 2>&1
      fi

      if diff -q "$output_file" "$expected_output" > /dev/null; then
        ((matched++))
      else
        ((unmatched++))
      fi
    done

    line_count=$(wc -l < "$source_file")
    comment_count=$(grep -c "$comment_symbol" "$source_file")

    case $lang in
      C|C++)
        function_count=$(grep -Ec '^\s*(int|void|float|double|char)\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(.*\)\s*{?' "$source_file")
        ;;
      Java)
        function_count=$(grep -Ec '^\s*(public|private|protected)?\s*(static)?\s*\w+\s+\w+\s*\(.*\)\s*{?' "$source_file")
        ;;
      Python)
        function_count=$(grep -Ec '^\s*def\s+\w+\s*\(.*\)\s*:' "$source_file")
        ;;
    esac

    echo "$student_id,\"$student_name\",$lang,$matched,$unmatched,$line_count,$comment_count,$function_count" >> "$result_csv"
    echo "📊 $student_name ($student_id) - $lang: Matched=$matched, Unmatched=$unmatched, LOC=$line_count, Comments=$comment_count, Functions=$function_count"
  done
done

echo "✅ All tests completed. Final report: targets/result.csv"

sed -E 's/_[0-9]{7}_submission//' "$result_csv" > targets/result.csv
rm "$result_csv"
