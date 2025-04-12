<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;

class RegisterRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'children' => ['required', 'array', 'min:1'],
      'children.*.name' => ['required', 'string'],
      'children.*.surname' => ['required', 'string'],
      'children.*.birth_date' => ['required', 'date'],
      'children.*.sex' => ['required', 'string'],
      'children.*.nationality_id' => ['required', 'integer', 'min:1'],
      'children.*.grade_id' => ['required', 'integer', 'min:1'],
      'children.*.admission_date' => ['required', 'date'],
      'children.*.previous_schools' => ['required', 'string'],
      'children.*.medical_recommendations' => ['required', 'string'],

      'parents' => ['required', 'array', 'min:1'],
      'parents.*.name' => ['required', 'string'],
      'parents.*.surname' => ['required', 'string'],
      'parents.*.birth_date' => ['required', 'date'],
      'parents.*.sex' => ['required', 'string'],
      'parents.*.nationality_id' => ['required', 'integer', 'min:1'],
      'parents.*.profession_id' => ['required', 'integer', 'min:1'],
      'parents.*.workplace' => ['required', 'string'],
      'parents.*.position' => ['required', 'string'],
      'parents.*.tel.code' => ['required', 'integer'],
      'parents.*.tel.numbers' => ['required', 'integer'],
      'parents.*.whatsapp.code' => ['required', 'integer'],
      'parents.*.whatsapp.numbers' => ['required', 'integer'],
      'parents.*.email' => ['nullable', 'email'],
      'parents.*.address.physical_address' => ['required', 'string'],
      'parents.*.address.region' => ['required', 'string'],
    ];
  }

  public function messages(): array
  {
    return [
      'children.required' => 'Необходимо указать как минимум одного ребенка.',
      'children.*.name.required' => 'Имя обязательно для заполнения.',
      'children.*.surname.required' => 'Фамилия обязательна для заполнения.',
      'children.*.birth_date.required' => 'Укажите дату рождения.',
      'children.*.birth_date.date' => 'Неверный формат даты рождения.',
      'children.*.sex.required' => 'Укажите пол.',
      'children.*.nationality_id.required' => 'Укажите национальность.',
      'children.*.nationality_id.min' => 'Укажите национальность.',
      'children.*.grade_id.required' => 'Укажите класс.',
      'children.*.grade_id.min' => 'Укажите класс.',
      'children.*.admission_date.required' => 'Укажите дату поступления.',
      'children.*.admission_date.date' => 'Неверный формат даты поступления.',
      'children.*.previous_schools.required' => 'Информация о предыдущих школах обязательна.',
      'children.*.medical_recommendations.required' => 'Медицинские рекомендации обязательны. Если нет, напишите "нет".',

      'parents.required' => 'Необходимо указать как минимум одного родителя.',
      'parents.*.name.required' => 'Имя обязательно для заполнения.',
      'parents.*.surname.required' => 'Фамилия обязательна для заполнения.',
      'parents.*.birth_date.required' => 'Укажите дату рождения.',
      'parents.*.birth_date.date' => 'Неверный формат даты рождения.',
      'parents.*.sex.required' => 'Укажите пол.',
      'parents.*.nationality_id.required' => 'Укажите национальность.',
      'parents.*.nationality_id.min' => 'Укажите национальность.',
      'parents.*.profession_id.required' => 'Укажите сферу деятельности.',
      'parents.*.profession_id.min' => 'Укажите сферу деятельности.',
      'parents.*.workplace.required' => 'Место работы обязательно.',
      'parents.*.position.required' => 'Должность обязательна.',
      'parents.*.tel.code.required' => 'Код телефона обязателен.',
      'parents.*.tel.numbers.required' => 'Номер телефона обязателен.',
      'parents.*.whatsapp.code.required' => 'Код WhatsApp обязателен.',
      'parents.*.whatsapp.numbers.required' => 'Номер WhatsApp обязателен.',
      'parents.*.email.email' => 'Неверный формат email.',
      'parents.*.address.physical_address.required' => 'Фактический адрес обязателен.',
      'parents.*.address.region.required' => 'Укажите регион.',
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

  protected function failedValidation(Validator $validator)
  {
    $rawErrors = (new ValidationException($validator))->errors();

    $structuredErrors = [];

    foreach ($rawErrors as $key => $messages) {
      $segments = explode('.', $key);
      $ref = &$structuredErrors;

      foreach ($segments as $i => $segment) {
        if (is_numeric($segment)) {
          $segment = (int) $segment;
          if (!isset($ref[$segment])) {
            $ref[$segment] = [];
          }
          $ref = &$ref[$segment];
        } elseif ($i === count($segments) - 1) {
          if (!isset($ref[$segment])) {
            $ref[$segment] = $messages;
          } else {
            $ref[$segment] = array_merge($ref[$segment], $messages);
          }
        } else {
          if (!isset($ref[$segment])) {
            $ref[$segment] = [];
          }
          $ref = &$ref[$segment];
        }
      }
    }

    throw new HttpResponseException(response()->json([
      'message' => 'Validation failed.',
      'errors' => $structuredErrors,
    ], 422));
  }
}
