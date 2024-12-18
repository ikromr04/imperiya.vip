@php
  $team = [
      [
          'avatar' => 'user1.jpg',
          'name' => 'Садыков Ризо Хисравович',
          'position' => 'Основатель компании',
      ],
      [
          'avatar' => 'user2.jpg',
          'name' => 'Коробкина Вероника Вячеславовна',
          'position' => 'Генеральный директор',
      ],
      [
          'avatar' => 'user3.jpg',
          'name' => 'Кулобиева Манзура Кузратуллоевна',
          'position' => 'Директор',
      ],
      [
          'avatar' => 'user4.jpg',
          'name' => 'Сидикова Фарида Сафаровна',
          'position' => 'Заместитель директора по УВЧ',
      ],
      [
          'avatar' => 'user5.jpg',
          'name' => 'Талибаева Лайло Худобердиевна',
          'position' => 'Председатель МО',
      ],
      [
          'avatar' => 'user6.jpg',
          'name' => 'Тынчерова Ирина Владимировна',
          'position' => 'Координатор по развитию методик',
      ],
      [
          'avatar' => 'user7.jpg',
          'name' => 'Имомалиева Любовь Джамолидиновна',
          'position' => 'Администратор',
      ],
      [
          'avatar' => 'user8.jpg',
          'name' => 'Сафина Галия Рафиковна',
          'position' => 'Педагог алгебры и геометрии',
      ],
      [
          'avatar' => 'user10.jpg',
          'name' => 'Саидова Барно Бабаевна',
          'position' => 'Педагог русского языка и литературы',
      ],
      [
          'avatar' => 'user11.jpg',
          'name' => 'Бекназарова Дилором Наботовна',
          'position' => 'Педагог биологии',
      ],
      [
          'avatar' => 'user12.jpg',
          'name' => 'Кузнецова Анастасия Андреевна',
          'position' => 'Педагог начальных классов',
      ],
      [
          'avatar' => 'user14.jpg',
          'name' => 'Ильбонова Зухра Давлатбековна',
          'position' => 'Педагог начальных классов',
      ],
      [
          'avatar' => 'user15.jpg',
          'name' => 'Хусейнзаде Замира Шавкатовна',
          'position' => 'Педагог ментальной арифметики',
      ],
      [
          'avatar' => 'user17.jpg',
          'name' => 'Хакимова Зумрад Джамшедовна',
          'position' => 'Педагог IT-технологий',
      ],
  ];
@endphp

<section class="container" id="team">
  <h2 class="title mb-6 md:mb-8 xl:mb-10 text-center">{{ __('Наша потрясающая команда') }}</h2>

  <div class="relative z-0 team w-60 mx-auto sm:w-[calc(2*240px+8px)] lg:w-[calc(3*240px+16px)] xl:w-[calc(4*240px+32px)]">
    <div class="swiper z-0">
      <div class="swiper-wrapper">
        @foreach ($team as $teammate)
          <div class="swiper-slide !flex justify-center">
            <x-teammate-card :teammate="$teammate" />
          </div>
        @endforeach
      </div>
    </div>

    <div class="absolute top-[100px] left-1/2 transform -translate-x-1/2 w-[calc(100%+40px)] flex justify-between z-10 sm:w-[calc(100%+112px)] md:top-[160px]">
      <button class="swiper-button-prev m-0 left-0 top-0 after:hidden flex justify-center items-center w-10 h-10 bg-primary rounded-full" type="button">
        <svg class="flex text-white !w-2 !h-4" width="8" height="16">
          <use xlink:href="#prev" />
        </svg>
      </button>
      <button class="swiper-button-next m-0 right-0 top-0 after:hidden flex justify-center items-center w-10 h-10 bg-primary rounded-full" type="button">
        <svg class="flex text-white !w-2 !h-4" width="8" height="16">
          <use xlink:href="#next" />
        </svg>
      </button>
    </div>
  </div>
</section>
