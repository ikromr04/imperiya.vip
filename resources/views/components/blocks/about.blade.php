@php
  $items = [
      [
          'title' => 'Профессионалы',
          'description' => 'Наши сотрудники являются опытными педагогами и ежегодно проходят международную сертификацию.',
      ],
      [
          'title' => 'Лучшие методики',
          'description' => 'Методики и разработанные нами программы одобрены Министерством образования и науки Республики Таджикистан и имеют международное признание.',
      ],
      [
          'title' => 'Инновации',
          'description' => 'В образовательную программу регулярно внедряются новые актуальные инновационные методики, соответствующие мировым тенденциям в сфере образования.',
      ],
      [
          'title' => 'Членство в Федерации Клубов ЮНЕСКО',
          'description' => 'В 2019 году Академия STEEM – образования «ИМПЕРИЯ ЗНАНИЙ» была официально принята в члены Национальной Федерации Клубов ЮНЕСКО и получила статус Ассоциированной Школы ЮНЕСКО.',
      ],
      [
          'title' => 'Индивидуальный подход',
          'description' => 'Мы применяем индивидуальные подходы к каждому ребенку с учетом его особенностей и интересов. Профессионально разработанные методики индивидуальных подходов развивают в детях умение взаимодействовать как со своим внутренним, так и с внешним миром.',
      ],
      [
          'title' => 'Международный опыт',
          'description' => '«ИМПЕРИЯ ЗНАНИЙ» - первая и единственная образовательная компания в Республике Таджикистан, которая при поддержке Правительства Республики провела международные олимпиады по ментальной арифметике и робототехнике в Таджикистане. («AsiaKids 2018» и «ШОСkids 2021»)',
      ],
  ];
@endphp

<section {{ $attributes->merge([
    'class' => 'relative z-0 container md:bg-white md:py-10 md:px-20 md:border md:border-brand md:rounded-[10px] md:mt-[10px]',
]) }} id="about">
  <div class="hidden md:block pointer-events-none absolute -top-[10px] -left-[.5px] h-10 rounded-[20px] bg-brand w-[448px] -z-10"></div>
  <div class="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-10 bg-white rounded-[10px]"></div>

  <h2 class="title mb-2">{{ __('О нас') }}</h2>

  <div class="relative group mb-8 rounded" data-sizable-wrapper>
    <div class="max-h-24 overflow-hidden transition-all duration-300 md:!max-h-none" data-sizable="96">
      <p class="md:text-gray-700 xl:max-w-[80%]">
        {{ __('«ИМПЕРИЯ ЗНАНИЙ» - частное общеобразовательное учреждение качественного элитного современного образования, соответствующего международным стандартам. С нами Ваш ребенок не только учится, он формирует свое уникальное образованное будущее, воплощая свои таланты под заботой опытной и вдохновляющей команды высококвалифицированных педагогов.') }}
      </p>
      <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none transition-all duration-300 group-[.shown]:opacity-0 md:hidden"></div>
    </div>
  </div>

  <ol class="md:flex md:flex-col md:gap-2 lg:grid lg:grid-cols-2 xl:grid-cols-3">
    @foreach ($items as $key => $item)
      <li class="relative z-0 group mb-6 md:border md:border-brand md:py-8 md:px-6 rounded-[10px] bg-white md:mb-0 md:mt-[5px]" data-sizable-wrapper>
        <div class="hidden md:block pointer-events-none absolute -top-[5px] -left-[.5px] h-10 rounded-[10px] bg-brand w-[240px] -z-10"></div>
        <div class="hidden md:block pointer-events-none absolute top-0 left-0 z-0 w-full h-10 bg-white rounded-[10px]"></div>

        <div class="max-h-32 overflow-hidden transition-all duration-300 md:!max-h-none relative z-0" data-sizable="128">
          <h3 class="font-semibold mb-1 text-lg md:flex md:items-center md:gap-x-3 md:mb-4">
            <span class="md:flex md:items-center md:justify-center md:min-w-10 md:min-h-10 md:max-w-10 md:max-h-10 md:rounded-full md:bg-brand md:text-white md:leading-none md:pt-[1px] md:pr-[1px]">
              {{ '0' . ++$key }}
            </span>
            {{ $item['title'] }}
          </h3>
          <p class="md:text-gray-700">{{ $item['description'] }}</p>
          <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-white to-transparent pointer-events-none transition-all duration-300 group-[.shown]:opacity-0 md:hidden"></div>
        </div>
      </li>
    @endforeach
  </ol>
</section>
