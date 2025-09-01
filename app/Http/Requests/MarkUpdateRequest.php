<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MarkUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => ['required', 'exists:marks,id'],
      'score_1' => ['nullable', 'numeric', 'between:1,10'],
      'score_2' => ['nullable', 'numeric', 'between:1,10'],
      'attendance' => ['nullable', 'string', Rule::in(['P', 'L', 'A', 'EA', 'SUS'])],
      'comment' => ['nullable', 'string', 'not_regex:/^\d+$/'],
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Поле "id" обязательно для заполнения.',
      'id.exists' => 'Оценка с таким ID не найдена.',

      'score_1.numeric' => 'Оценка 1 должна быть числом.',
      'score_1.between' => 'Оценка должна быть от 1 до 10.',

      'score_2.numeric' => 'Оценка 2 должна быть числом.',
      'score_2.between' => 'Оценка должна быть от 1 до 10.',

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
