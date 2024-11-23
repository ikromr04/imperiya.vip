<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'token' => 'required',
      'password' => 'required|confirmed|min:6',
    ];
  }

  public function messages(): array
  {
    return [
      'password.required' => 'Пароль обязателен.',
      'password.confirmed' => 'Подтверждение пароля не совпадает.',
      'password.min' => 'Пароль должен содержать не менее :min символов.',
    ];
  }
}
