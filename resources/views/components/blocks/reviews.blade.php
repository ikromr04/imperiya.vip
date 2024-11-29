@php
  $reviews = [
      [
          'name' => 'Насима Бахрамова',
          'avatar' => 'avatar1.jpg',
          'comment-title' => 'Первое уникальное частное общеобразовательное учреждение',
          'comment' => 'В Таджикистане открылось первое уникальное частное общеобразовательное учреждение со значимым названием «Империя Знаний - школа счастья», где детей учат быть счастливыми! Ведь, прежде чем стать успешным, нужно научиться быть счастливым. Вот тот акцент, который преопределил выбор школы для дочери.',
      ],
      [
          'name' => 'Нигина Набиева',
          'avatar' => 'avatar2.jpg',
          'comment-title' => 'Лучший выбор для получения качественного школьного образования',
          'comment' => 'Школа «Империя знаний» — это лучший выбор, сделанный нами для получения качественного школьного образования! У нас там учатся оба сына. Наши дети учатся с большим желанием и удовольствием! Школа уютная, в ней дружная и теплая атмосфера. Самая большая ценность и достоинство — очень квалифицированные педагоги, чуткие, внимательные, добрые! Всегда помогут, поддержат, подбодрят, объяснят. Все учащиеся и учителя, а также остальные сотрудники школы, как большая семья. Наши дети очень любят свою школу !',
      ],
      [
          'name' => 'Равшан Алимов',
          'avatar' => 'avatar3.jpg',
          'comment-title' => 'Школа «Империя Знаний» – настоящее воплощение образования',
          'comment' => 'Школа «Империя Знаний» – настоящее воплощение образования! Благодарен за качественное обучение моей дочери.',
      ],
      [
          'name' => 'Нодира Мазитова',
          'avatar' => 'avatar4.jpg',
          'comment-title' => 'Школа, где прививают любовь к учебному процессу',
          'comment' => 'Школа «Империя Знаний» - школа, в которой детям прививают любовь к учебному процессу. С каждым годом моя дочь стремится стать лучше, показывая отличные результаты, как в учебе так и в личностном росте. И также я спокойна, так как школа обеспечивает полную безопасность, психологическую и моральную поддержку.',
      ],
      [
          'name' => 'Ирина Калашникова',
          'avatar' => 'avatar5.jpg',
          'comment-title' => '"Империя знаний" — это школа поистине с человеческим лицом',
          'comment' => 'В очередной раз хочу сказать, что ЧОУ "Империя знаний" — это школа поистине с человеческим лицом. Такой заботы об учащихся мы в другой школе не видели и не ощущали. Интересный учебный процесс, новшества, творческая атмосфера, замечательный педагогический коллектив, дети здесь в центре внимания и заботы, мы уже стали большой семьей, а школа, без преувеличения, и в самом истинном смысле – родным домом. Здесь учат, удивляют, здесь стараются, здесь поддерживают!',
      ],
  ];
@endphp

<section {{ $attributes->merge([
    'class' => 'relative z-0 flex flex-col md:bg-white md:py-10 md:px-20 md:border md:border-primary md:rounded-[10px] md:w-[90vw] md:max-w-[1150px] md:mx-auto md:mt-[10px]',
]) }}>
  <div class="hidden md:block pointer-events-none absolute -top-[10px] -left-[.5px] h-10 rounded-[20px] bg-primary w-[448px] -z-10"></div>
  <div class="hidden md:block pointer-events-none absolute top-0 left-0 w-full h-10 bg-white rounded-[10px]"></div>

  <div class="bg-primary text-white md:bg-transparent md:text-inherit md:m-0 md:p-0 py-8 md:py-0">
    <h2 class="title flex items-center justify-between pl-[5vw] gap-x-4 mb-5 md:p-0">
      {{ __('Вот, что о нас говорят') }}:

      <a class="text-[15px] font-normal min-h-8 pl-4 py-2 !pr-[5vw] !rounded-r-none md:!pr-4 md:text-white md:bg-primary md:!rounded-r-full min-w-max flex items-center gap-x-2 justify-center border border-white text-primary bg-white rounded-full leading-none px-3">
        {{ __('Все отзывы 5.0') }}
        <svg class="text-[#FAC816] mb-[2px]" width="16" height="16">
          <use xlink:href="#star" />
        </svg>
      </a>
    </h2>

    <p class="mx-[5vw] md:mx-0">
      {{ __('Образование является источником счастья для всех участников образовательного процесса.') }}
    </p>
  </div>

  <div class="relative z-0 reviews-swiper px-[5vw] md:max-w-max md:mx-auto md:p-0 md:mt-8 lg:max-w-full">
    <div class="bg-primary absolute -top-[1px] left-0 w-full h-[150px] md:hidden"></div>
    <div class="swiper sm:max-w-[488px] lg:max-w-full">
      <div class="swiper-wrapper">
        @foreach ($reviews as $review)
          <div class="swiper-slide flex flex-col items-center">
            <x-review-card :review="$review" />
          </div>
        @endforeach
      </div>
    </div>

    <div class="absolute z-10 left-1/2 transform -translate-x-1/2 top-[150px] h-0 w-[calc(240px+80px)] sm:w-[584px] md:w-[calc(100%+96px)] md:top-[160px]">
      <button class="swiper-button-prev after:hidden absolute left-0 !m-0 flex w-8 h-8 transform -translate-y-1/2 justify-center items-center rounded-full bg-primary border border-white pr-[2px]" type="button">
        <svg class="flex text-white !w-2 !h-4" width="8" height="16">
          <use xlink:href="#prev" />
        </svg>
      </button>
      <button class="swiper-button-next after:hidden absolute right-0 !m-0 flex w-8 h-8 transform -translate-y-1/2 justify-center items-center rounded-full bg-primary border border-white pl-[2px]" type="button">
        <svg class="flex text-white !w-2 !h-4" width="8" height="16">
          <use xlink:href="#next" />
        </svg>
      </button>
    </div>
  </div>
</section>
