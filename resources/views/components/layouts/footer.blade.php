<footer class="bg-primary text-white py-8 md:py-10 lg:py-12">
  <div class="container flex flex-col gap-6 md:flex-row lg:grid lg:grid-cols-2">
    <div class="flex flex-col gap-6">
      <section class="rounded-lg border border-dashed p-6">
        <h2 class="text-lg font-semibold mb-2 leading-[1.2]">
          {{ __('Остались вопросы? Всегда рады ответить!') }}
        </h2>
        <p>
          {{ __('Наши контакты') }}:
          <a class="opacity-50 font-semibold" href="mailto:info@imperiya.vip">info@imperiya.vip</a>,
          <a class="opacity-50 font-semibold" href="tel:+992904406560">+992 90 440 6560,</a>,
          {{ __('Республика Таджикистан, г.Душанбе, ул.Асадулло Гуломова 20') }}
        </p>
      </section>

      <section class="rounded-lg border border-dashed p-6">
        <h2 class="text-lg font-semibold mb-2 leading-[1.2]">
          {{ __('Вход для учеников и родителей') }}
        </h2>
        <p>
          {{ __('Воспользуйтесь ссылкой для авторизации') }}:
          <a class="opacity-50 font-semibold" href="{{ route('journal', 'journal') }}">онлайн-журнал</a>
        </p>
      </section>
    </div>

    <div class="flex flex-wrap gap-6 lg:justify-around">
      <section>
        <h2 class="text-lg font-semibold mb-4 leading-[1.2]">
          {{ __('Быстрые ссылки') }}
        </h2>

        <ul class="flex flex-col gap-2">
          <li>
            <a class="opacity-70 transition-all duration-150 hover:opacity-100" href="{{ route('journal', 'journal/books') }}">
              {{ __('Библиотека') }}
            </a>
          </li>
          <li>
            <a class="opacity-70 transition-all duration-150 hover:opacity-100" href="{{ route('journal', 'journal/schedule') }}">
              {{ __('Расписание занятий') }}
            </a>
          </li>
          <li>
            <a class="opacity-70 transition-all duration-150 hover:opacity-100" href="{{ route('journal', 'journal/books') }}">
              {{ __('Объявления и события') }}
            </a>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-4 leading-[1.2]">
          {{ __('Будьте на связи') }}
        </h2>

        <ul class="flex flex-col gap-2">
          <li>
            <a class="opacity-70 transition-all duration-150 hover:opacity-100 flex items-center gap-2" href="https://facebook.com/ImperiumschoolTj" target="_blank">
              <svg width="24" height="24" fill="#fff" stroke="#fff" viewBox="0 0 32 32">
                <path d="M30.996 16.091C30.995 7.81 24.282 1.097 16 1.097S1.004 7.811 1.004 16.093c0 7.455 5.44 13.639 12.566 14.8l.086.012V20.427H9.848v-4.336h3.808v-3.302a5.293 5.293 0 0 1 5.684-5.834l-.018-.001c1.199.017 2.359.123 3.491.312l-.134-.019v3.69h-1.892a2.168 2.168 0 0 0-2.444 2.351l-.001-.009v2.812h4.159l-.665 4.336h-3.494v10.478c7.213-1.174 12.653-7.359 12.654-14.814z" />
              </svg>
              Facebook
            </a>
          </li>
          <li>
            <a class="opacity-70 transition-all duration-150 hover:opacity-100 flex items-center gap-2" href="https://www.instagram.com/imperiyaschool" target="_blank">
              <svg width="24" height="24" fill="#fff" stroke="#fff" viewBox="-143 145 512 512">
                <path d="M113 446c24.8 0 45.1-20.2 45.1-45.1 0-9.8-3.2-18.9-8.5-26.3-8.2-11.3-21.5-18.8-36.5-18.8s-28.3 7.4-36.5 18.8c-5.3 7.4-8.5 16.5-8.5 26.3C68 425.8 88.2 446 113 446zM211.4 345.9v-43.4h-5.6l-37.8.1.2 43.4z" />
                <path d="M183 401c0 38.6-31.4 70-70 70s-70-31.4-70-70c0-9.3 1.9-18.2 5.2-26.3H10v104.8C10 493 21 504 34.5 504h157c13.5 0 24.5-11 24.5-24.5V374.7h-38.2c3.4 8.1 5.2 17 5.2 26.3z" />
                <path d="M113 145c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256zm128 229.7v104.8c0 27.3-22.2 49.5-49.5 49.5h-157C7.2 529-15 506.8-15 479.5V322.4c0-27.3 22.2-49.5 49.5-49.5h157c27.3 0 49.5 22.2 49.5 49.5v52.3z" />
              </svg>
              Instagram
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</footer>
