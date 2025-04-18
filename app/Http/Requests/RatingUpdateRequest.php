<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RatingUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => ['required', 'exists:ratings,id'],
      'score' => ['nullable', 'numeric', Rule::in([2, 3, 4, 5, null])],
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Поле "id" обязательно для заполнения.',
      'id.exists' => 'Рейтинг с таким ID не найдена.',

      'score.numeric' => 'Оценка должна быть числом.',
      'score.in' => 'Оценка должна быть одной из следующих: 2, 3, 4, 5, null.',
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
