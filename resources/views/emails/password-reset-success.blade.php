<!DOCTYPE html>
<html lang="ru">

<head>
  <title>Сброс пароля прошел успешно</title>
</head>

<body>
  <div style="display: flex; justify-content: center; font-family: sans-serif; color: #4B5563; font-size: 16px; width: 100%; height: 100%; background-color: #f3f4f6; padding: 40px 40px 80px 40px; box-sizing: border-box;">
    <div style="padding: 32px; background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 20%); margin: 0 auto; max-width: 420px;">
      <h1 style="font-size: 20px;">Сброс пароля прошел успешно</h1>
      <p>
        Ваш пароль был успешно обновлен. Ваши новые реквизиты для входа:
      </p>

      <div>
        <p><strong>E-mail:</strong> {{ $credentials['email'] }}</p>
        <p><strong>Пароль:</strong> {{ $credentials['password'] }}</p>
      </div>
    </div>
  </div>
</body>

</html>
