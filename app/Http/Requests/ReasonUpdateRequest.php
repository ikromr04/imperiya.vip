<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReasonUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => 'required|exists:reasons,id',
      'description' => 'required|unique:reasons,description',
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Обязательное поле.',
      'id.exists' => 'Причина не найден.',
      'description.required' => 'Обязательное поле.',
      'description.unique' => 'Такая причина уже существует',
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
