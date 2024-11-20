<section {{ $attributes->merge([
    'class' => 'bg-brand text-white py-8 md:py-10 lg:py-12',
]) }} id="values">
  <div class="relative z-0 container">
    <h2 class="title mb-4 md:mb-6 xl:mb-8">{{ __('Наши ценности') }}</h2>

    <div class="flex flex-col gap-2 md:gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
      <div class="relative border border-white rounded-[10px] flex flex-col md:mt-[5px]">
        <div class="hidden md:block pointer-events-none absolute -top-[5px] -left-[.5px] h-10 rounded-[10px] bg-white w-[240px] -z-10"></div>
        <div class="hidden md:block pointer-events-none absolute top-0 left-0 z-0 w-full h-10 bg-brand rounded-[10px]"></div>

        <div class="pt-4 p-6 overflow-hidden relative z-10 lg:p-8">
          <h2 class="font-semibold text-lg mb-3">
            {{ __('Базовые') }}
          </h2>

          <ul class="flex flex-col gap-2">
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Высококвалифицированная команда') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Единая система преподавания') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Уникальная методика') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Качество') }}
            </li>
          </ul>
        </div>
      </div>

      <div class="relative border border-white rounded-[10px] flex flex-col md:mt-[5px]">
        <div class="hidden md:block pointer-events-none absolute -top-[5px] -left-[.5px] h-10 rounded-[10px] bg-white w-[240px] -z-10"></div>
        <div class="hidden md:block pointer-events-none absolute top-0 left-0 z-0 w-full h-10 bg-brand rounded-[10px]"></div>

        <div class="pt-4 p-6 overflow-hidden relative z-10 lg:p-8">
          <h2 class="font-semibold text-lg mb-3">
            {{ __('Духовные') }}
          </h2>

          <ul class="flex flex-col gap-2">
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Индивидуальный подход') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Уважение ребенка') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Доверие') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Открытость') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Адаптация') }}
            </li>
          </ul>
        </div>
      </div>

      <div class="relative border border-white rounded-[10px] flex flex-col md:mt-[5px]">
        <div class="hidden md:block pointer-events-none absolute -top-[5px] -left-[.5px] h-10 rounded-[10px] bg-white w-[240px] -z-10"></div>
        <div class="hidden md:block pointer-events-none absolute top-0 left-0 z-0 w-full h-10 bg-brand rounded-[10px]"></div>

        <div class="pt-4 p-6 overflow-hidden relative z-10 lg:p-8">
          <h2 class="font-semibold text-lg mb-3">
            {{ __('Общественные') }}
          </h2>

          <ul class="flex flex-col gap-2">
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Развитие семейных ценностей') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Прозрачность') }}
            </li>
            <li class="flex gap-x-2">
              <span class="flex justify-center items-center min-w-6 min-h-6 max-w-6 max-h-6 rounded-full">
                <svg width="12" height="9">
                  <use xlink:href="#check" />
                </svg>
              </span>
              {{ __('Позитивное влияние на умы и сердца детей') }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>
