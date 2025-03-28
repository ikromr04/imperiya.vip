<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'login' => 'required|exists:users,login',
      'password' => 'required',
    ];
  }

  public function messages(): array
  {
    return [
      'login.required' => 'Требуется логин.',
      'login.exists' => 'Нам не удалось найти пользователя с таким логином.',
      'password.required' => 'Пароль обязательно для заполнения.',
    ];
  }
}
