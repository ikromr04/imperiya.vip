<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfessionUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => 'required|exists:professions,id',
      'name' => 'required|unique:professions,name',
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Обязательное поле.',
      'id.exists' => 'Сфера деятельности не найден.',
      'name.required' => 'Обязательное поле.',
      'name.unique' => 'Такой сферы деятельности уже существует',
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
