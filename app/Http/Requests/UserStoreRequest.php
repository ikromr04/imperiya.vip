<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;

class UserStoreRequest extends FormRequest
{
  public function authorize(): bool
  {
    return true;
  }

  public function rules(): array
  {
    return [
      'name' => ['required', 'string', 'not_regex:/^\d+$/'],
      'surname' => ['required', 'string', 'not_regex:/^\d+$/'],
      'patronymic' => ['nullable', 'string', 'not_regex:/^\d+$/'],

      'role' => ['required', Rule::in(['superadmin', 'admin', 'director', 'teacher', 'parent', 'student'])],
      'sex' => ['required', Rule::in(['male', 'female'])],
      'birth_date' => ['required', 'date'],

      'nationality_id' => ['required', 'integer', 'exists:nationalities,id'],

      'email' => ['nullable', 'email'],

      'address.physical_address' => ['required', 'string', 'not_regex:/^\d+$/'],
      'address.region' => ['required', 'string', 'not_regex:/^\d+$/'],

      'phone_numbers' => ['nullable', 'array'],
      'phone_numbers.*.code' => ['required_with:phone_numbers', 'numeric'],
      'phone_numbers.*.numbers' => ['required_with:phone_numbers', 'numeric'],

      'whatsapp' => ['nullable', 'array'],
      'whatsapp.code' => ['required_with:whatsapp', 'numeric'],
      'whatsapp.numbers' => ['required_with:whatsapp', 'numeric'],

      'teacher' => ['nullable', 'array'],
      'teacher.grades' => ['nullable', 'array'],
      'teacher.grades.*' => ['integer', 'exists:grades,id'],

      'parent' => ['nullable', 'array'],
      'parent.children' => ['nullable', 'array'],
      'parent.children.*' => ['integer', 'exists:users,id'],
      'parent.profession_id' => ['required_with:parent', 'exists:professions,id'],
      'parent.workplace' => ['required_with:parent', 'string', 'not_regex:/^\d+$/'],
      'parent.position' => ['required_with:parent', 'string', 'not_regex:/^\d+$/'],

      'student' => ['nullable', 'array'],
      'student.grade_id' => ['required_with:student', 'integer', 'exists:grades,id'],
      'student.mother_id' => ['nullable', 'integer', 'exists:users,id'],
      'student.father_id' => ['nullable', 'integer', 'exists:users,id'],
      'student.admission_date' => ['required_with:student', 'date'],
      'student.previous_schools' => ['required_with:student', 'string', 'not_regex:/^\d+$/'],
      'student.medical_recommendations' => ['required_with:student', 'string', 'not_regex:/^\d+$/'],
    ];
  }

  public function messages(): array
  {
    return [
      'name.required' => 'Поле "Имя" обязательно для заполнения.',
      'name.string' => 'Поле "Имя" должно быть строкой.',
      'name.not_regex' => 'Поле "Имя" не может содержать только цифры.',

      'surname.required' => 'Поле "Фамилия" обязательно для заполнения.',
      'surname.string' => 'Поле "Фамилия" должно быть строкой.',
      'surname.not_regex' => 'Поле "Фамилия" не может содержать только цифры.',

      'patronymic.string' => 'Поле "Отчество" должно быть строкой.',
      'patronymic.not_regex' => 'Поле "Отчество" не может содержать только цифры.',

      'role.required' => 'Поле "Роль" обязательно для заполнения.',
      'role.in' => 'Поле "Роль" должно быть одним из данных значений.',

      'sex.required' => 'Поле "Пол" обязательно для заполнения.',
      'sex.in' => 'Поле "Пол" должно быть одним из данных значений.',

      'birth_date.required' => 'Поле "Дата рождения" обязательно для заполнения.',
      'birth_date.date' => 'Поле "Дата рождения" должно быть датой.',

      'nationality_id.required' => 'Поле "Национальность" обязательно для заполнения.',
      'nationality_id.integer' => 'Поле "Национальность" должно быть целым числом.',
      'nationality_id.exists' => 'Указанная национальность не существует.',

      'email.email' => 'Поле "Email" должно быть действительным адресом электронной почты.',

      'address.physical_address.required' => 'Поле "Физический адрес" обязательно для заполнения.',
      'address.physical_address.string' => 'Поле "Физический адрес" должно быть строкой.',
      'address.physical_address.not_regex' => 'Поле "Физический адрес" не может содержать только цифры.',

      'address.region.required' => 'Поле "Регион" обязательно для заполнения.',
      'address.region.string' => 'Поле "Регион" должно быть строкой.',
      'address.region.not_regex' => 'Поле "Регион" не может содержать только цифры.',

      'phone_numbers.array' => 'Поле "Телефонные номера" должно быть массивом.',
      'phone_numbers.*.code.required_with' => 'Поле "Код" обязательно, если указаны телефонные номера.',
      'phone_numbers.*.code.numeric' => 'Поле "Код" должно быть числом.',
      'phone_numbers.*.numbers.required_with' => 'Поле "Номер" обязательно, если указаны телефонные номера.',
      'phone_numbers.*.numbers.numeric' => 'Поле "Номер" должно быть числом.',

      'whatsapp.array' => 'Поле "WhatsApp" должно быть массивом.',
      'whatsapp.code.required_with' => 'Поле "Код" WhatsApp обязательно, если указаны номера WhatsApp.',
      'whatsapp.code.numeric' => 'Поле "Код" WhatsApp должно быть числом.',
      'whatsapp.numbers.required_with' => 'Поле "Номер" WhatsApp обязательно, если указаны номера WhatsApp.',
      'whatsapp.numbers.numeric' => 'Поле "Номер" WhatsApp должно быть числом.',

      'teacher.array' => 'Поле "Учитель" должно быть массивом.',
      'teacher.grades.array' => 'Поле "Классы" должно быть массивом.',
      'teacher.grades.*.integer' => 'Каждое значение в поле "Классы" должно быть целым числом.',
      'teacher.grades.*.exists' => 'Каждое значение в поле "Классы" должно существовать в базе данных.',

      'parent.array' => 'Поле "Родитель" должно быть массивом.',
      'parent.children.array' => 'Поле "Дети" должно быть массивом.',
      'parent.children.*.integer' => 'Каждое значение в поле "Дети" должно быть целым числом.',
      'parent.children.*.exists' => 'Каждое значение в поле "Дети" должно существовать в базе данных.',
      'parent.profession_id.required_with' => 'Поле "Профессия" обязательно, если указан родитель.',
      'parent.profession_id.exists' => 'Указанная профессия не существует.',
      'parent.workplace.required_with' => 'Поле "Место работы" обязательно, если указан родитель.',
      'parent.workplace.string' => 'Поле "Место работы" должно быть строкой.',
      'parent.workplace.not_regex' => 'Поле "Место работы" не может содержать только цифры.',
      'parent.position.required_with' => 'Поле "Должность" обязательно, если указан родитель.',
      'parent.position.string' => 'Поле "Должность" должно быть строкой.',
      'parent.position.not_regex' => 'Поле "Должность" не может содержать только цифры.',

      'student.array' => 'Поле "Студент" должно быть массивом.',
      'student.grade_id.required_with' => 'Поле "Класс" обязательно, если указан ученик.',
      'student.grade_id.integer' => 'Поле "Класс" должно быть целым числом.',
      'student.grade_id.exists' => 'Указанный класс не существует.',
      'student.mother_id.integer' => 'Поле "ID матери" должно быть целым числом.',
      'student.mother_id.exists' => 'Указанная мать не существует.',
      'student.father_id.integer' => 'Поле "ID отца" должно быть целым числом.',
      'student.father_id.exists' => 'Указанный отец не существует.',
      'student.admission_date.required_with' => 'Поле "Дата поступления" обязательно, если указан ученик.',
      'student.admission_date.date' => 'Поле "Дата поступления" должно быть датой.',
      'student.previous_schools.required_with' => 'Поле "Предыдущие школы" обязательно, если указан ученик.',
      'student.previous_schools.string' => 'Поле "Предыдущие школы" должно быть строкой.',
      'student.previous_schools.not_regex' => 'Поле "Предыдущие школы" не может содержать только цифры.',
      'student.medical_recommendations.required_with' => 'Поле "Медицинские рекомендации" обязательно, если указан ученик.',
      'student.medical_recommendations.string' => 'Поле "Медицинские рекомендации" должно быть строкой.',
      'student.medical_recommendations.not_regex' => 'Поле "Медицинские рекомендации" не может содержать только цифры.',
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
