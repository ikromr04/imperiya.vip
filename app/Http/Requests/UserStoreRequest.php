<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => 'required',
      'login' => 'required|unique:users,login',
      'email' => 'unique:users,email',
      'role_type' => 'required',
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Введите ФИО пользователя.',
      'login.required' => 'Требуется логин почта.',
      'login.unique' => 'Пользователь с таким логином уже существует.',
      'role_type.required' => 'Выберите позицию.',
      'email.unique' => 'Пользователь с таким E-mail-ом уже существует.',
    ];
  }
}
