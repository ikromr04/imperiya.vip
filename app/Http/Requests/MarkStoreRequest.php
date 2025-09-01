<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarkStoreRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'student_id' => ['required', 'exists:users,id'],
      'lesson_id' => ['required', 'exists:lessons,id'],
      'score_1' => ['nullable', 'numeric', 'between:1,10'],
      'score_2' => ['nullable', 'numeric', 'between:1,10'],
      'attendance' => ['required', 'string', Rule::in(['P', 'L', 'A', 'EA', 'SUS'])],
      'comment' => ['nullable', 'string', 'not_regex:/^\d+$/'],
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Поле "Ученик" обязательно для заполнения.',
      'id.exists' => 'Ученик с таким ID не найдена.',

      'id.required' => 'Поле "Предмет" обязательно для заполнения.',
      'id.exists' => 'Предмет с таким ID не найдена.',

      'score_1.numeric' => 'Оценка 1 должна быть числом.',
      'score_1.between' => 'Оценка должна быть от 1 до 10.',

      'score_2.numeric' => 'Оценка 2 должна быть числом.',
      'score_2.between' => 'Оценка должна быть от 1 до 10.',

      'attendance.required' => 'Укажите посещаемость.',
      'attendance.string' => 'Тип посещаемости должен быть строкой.',
      'attendance.in' => 'Недопустимое значение посещаемости. Возможные варианты: P, L, A, EA, SUS.',

      'comment.string' => 'Комментарий должен быть строкой.',
      'comment.not_regex' => 'Комментарий не может состоять только из цифр.',
    ];
  }

  protected function prepareForValidation()
  {
    $this->replace($this->trimRecursive($this->all()));
  }

  private function trimRecursive($value)
  {
    if (is_array($value)) {
      return array_map([$this, 'trimRecursive'], $value);
    }

    return is_string($value) ? trim($value) : $value;
  }
}
