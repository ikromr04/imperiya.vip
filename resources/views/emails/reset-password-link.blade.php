<!DOCTYPE html>
<html lang="ru">

<head>
  <title>Сброс пароля</title>
</head>

<body>
  <div style="display: flex; justify-content: center; font-family: sans-serif; color: #4B5563; font-size: 16px; width: 100%; height: 100%; background-color: #f3f4f6; padding: 40px 40px 80px 40px; box-sizing: border-box;">
    <div style="padding: 32px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 20%); margin: 0 auto; max-width: 420px;">
      <h1 style="font-size: 20px;">Сброс пароля</h1>
      <p>
        Вы получили это письмо, потому что мы получили запрос на сброс пароля для вашей учетной записи.
      </p>
      <a style="display: flex; transition: .3s; max-width: max-content; background-color: #0D457E; text-decoration: none; color: white; border-radius: 6px; padding: 8px 16px;" href="{{ route('journal', "auth/reset-password/$token") }}">
        Сбросить пароль
      </a>

      <div>
        <p><strong>Срок действия ссылки для сброса пароля истекает через 60 минут.</strong></p>
        <p>Если вы не запрашивали сброс пароля, никаких дальнейших действий не требуется.</p>
      </div>
    </div>
  </div>
</body>

</html>
