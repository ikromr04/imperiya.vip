<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'id' => ['required', 'integer', 'exists:users,id'],
      'name' => ['string', 'max:255'],
      'surname' => ['string', 'max:255'],
      'patronymic' => ['string', 'max:255'],
      'login' => ['string', 'max:255'],
      'sex' => ['in:male,female'],
      'birth_date' => ['date'],
      'nationality_id' => ['integer', 'exists:nationalities,id'],
      'email' => ['nullable', 'email', 'max:255'],

      'address' => ['array'],
      'address.physical_address' => ['required_with:address', 'string', 'max:255'],
      'address.region' => ['required_with:address', 'string', 'max:255'],

      'social_link' => ['array'],
      'social_link.facebook' => ['nullable', 'url'],
      'social_link.instagram' => ['nullable', 'url'],
      'social_link.telegram' => ['nullable', 'url'],
      'social_link.odnoklassniki' => ['nullable', 'url'],

      'phone_numbers' => ['array'],
      'phone_numbers.*.numbers' => ['required_with:phone_numbers', 'numeric'],
      'phone_numbers.*.code' => ['required_with:phone_numbers', 'numeric'],

      'whatsapp' => ['nullable', 'array'],
    ];
  }

  public function messages(): array
  {
    return [
      'id.required' => 'Поле "id" обязательно для заполнения.',
      'id.integer' => 'Поле "id" должно быть числом.',
      'id.exists' => 'Пользователь с таким ID не найден.',

      'name.string' => 'Поле "Имя" должно быть строкой.',
      'name.max' => 'Поле "Имя" не должно превышать 255 символов.',

      'surname.string' => 'Поле "Фамилия" должно быть строкой.',
      'surname.max' => 'Поле "Фамилия" не должно превышать 255 символов.',

      'patronymic.string' => 'Поле "Отчество" должно быть строкой.',
      'patronymic.max' => 'Поле "Отчество" не должно превышать 255 символов.',

      'login.string' => 'Поле "Логин" должно быть строкой.',
      'login.max' => 'Поле "Логин" не должно превышать 255 символов.',

      'sex.in' => 'Поле "Пол" должно быть одним из следующих значений: Мужской, Женский',

      'birth_date.date' => 'Поле "Дата рождения" должно быть корректной датой.',

      'nationality_id.integer' => 'Поле "Национальность" должно быть числом.',
      'nationality_id.exists' => 'Выбранная национальность не найдена.',

      'email.email' => 'Поле "Email" должно содержать корректный адрес.',
      'email.max' => 'Поле "Email" не должно превышать 255 символов.',

      'address.array' => 'Поле "Адрес" должно быть обектом.',
      'address.physical_address.required_with' => 'Поле "Физический адрес" обязательно при наличии адреса.',
      'address.region.required_with' => 'Поле "Район" обязательно при наличии адреса.',

      'social_link.array' => 'Поле "Социальные сети" должно быть массивом.',
      'social_link.*.url' => 'Поле ":attribute" должно содержать корректную ссылку.',

      'phone_numbers.array' => 'Поле "Номера телефонов" должно быть массивом.',
      'phone_numbers.*.numbers.required_with' => 'Поле "Номер телефона" обязательно.',
      'phone_numbers.*.code.required_with' => 'Поле "Код страны" обязательно.',

      'whatsapp.array' => 'Поле "WhatsApp" должно быть массивом.',
      'whatsapp.code.required_with' => 'Поле "Код WhatsApp" обязательно.',
      'whatsapp.numbers.required_with' => 'Поле "Номер WhatsApp" обязательно.',
    ];
  }
}
