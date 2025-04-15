<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SubjectUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => 'required|exists:subjects,id',
      'name' => 'required|unique:subjects,name',
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Обязательное поле.',
      'id.exists' => 'Предмет не найден.',
      'name.required' => 'Обязательное поле.',
      'name.unique' => 'Такой предмет уже существует',
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
