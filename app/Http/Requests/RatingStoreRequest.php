<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RatingStoreRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'years' => ['required', 'string'],
      'rating' => ['nullable', 'string', Rule::in([
        'quarter1',
        'quarter2',
        'semester1',
        'quarter3',
        'quarter4',
        'semester2',
        'annual',
        'assessment',
        'final',
      ])],
      'score' => ['nullable', 'numeric', 'between:1,10'],
      'student_id' => ['required', 'exists:users,id'],
      'grade_id' => ['required', 'exists:grades,id'],
      'subject_id' => ['required', 'exists:subjects,id'],
    ];
  }

  public function messages(): array
  {
    return [
      'score.numeric' => 'Оценка 1 должна быть числом.',
      'score.between' => 'Оценка должна быть от 1 до 10.',
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
