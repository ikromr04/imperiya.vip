<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NationalityUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => 'required|exists:nationalities,id',
      'name' => 'required|unique:nationalities,name',
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Обязательное поле.',
      'id.exists' => 'Национальность не найден.',
      'name.required' => 'Обязательное поле.',
      'name.unique' => 'Такая национальность уже существует',
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
