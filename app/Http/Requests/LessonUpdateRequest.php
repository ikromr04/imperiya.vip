<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => 'required',
      'name' => 'required|unique:lessons,name',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Обязательное поле.',
      'name.unique' => 'Такой урок уже существует',
    ];
  }
}
