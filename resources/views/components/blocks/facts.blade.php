<section class="flex flex-col bg-primary text-white py-8 md:py-10 lg:py-12" id="facts">
  <div class="container">
    <h2 class="title mb-2">{{ __('Факты о нас') }}</h2>
    <p class="max-w-[690px]">
      {{ __('Наши достижения в цифрах: инновационные образовательные методики, выдающиеся успехи учеников и гордые моменты, которые делают нас лучшим выбором для вашего ребенка') }}
    </p>

    <x-statistics class="mt-6 mb-14" />

    <blockquote class="relative z-0 md:border md:border-white md:py-8 md:px-6 rounded-[10px] bg-primary md:mt-[5px]">
      <div class="hidden md:block pointer-events-none absolute -top-[5px] -left-[1px] h-10 rounded-[10px] bg-white w-[240px] -z-10"></div>
      <div class="hidden md:block pointer-events-none absolute top-0 left-0 z-0 w-full h-10 bg-primary rounded-[10px]"></div>

      <div class="relative z-0">
        <q class="block text-lg text-[17px] mb-2">
          {{ __('Постоянная работа над собой, повышение уровня знаний на протяжении всей жизни, принятие быстрых и правильных решений – вот, что отличает современного человека. Мы пытаемся вложить это в наших детей. У нас прекрасные дети и мы гордимся ими! Мы встречаемся с разными детьми, но всех их объединяет стремление к лучшему, любопытство к новым познаниям и наша задача создать для них такую среду, в которой они могли бы в полной мере раскрыться, продемонстрировать свои таланты и при этом не потерять этого прекрасного чувства счастливого детства.') }}
        </q>

        <p class="text-xs max-w-max ml-auto">
          <strong class="block text-base font-semibold">{{ __('Садыков Ризо Хисравович') }}</strong> {{ __('основатель компании «ИМПЕРИЯ ЗНАНИЙ»') }}
        </p>
      </div>
    </blockquote>
  </div>
</section>
