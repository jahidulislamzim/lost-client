import React from 'react';

const reviews = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    role: 'Student, DU',
    avatar: 'https://i.pravatar.cc/100?img=5',
    rating: 5,
    text:
      'I found my lost backpack within a day. The community here is amazing and the process was super smooth!'
  },
  {
    id: 2,
    name: 'Tanvir Hasan',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/100?img=11',
    rating: 4,
    text:
      'Great platform! I recovered my wallet thanks to a kind stranger. The UI is clean and easy to use.'
  },
  {
    id: 3,
    name: 'Mitu Akter',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/100?img=32',
    rating: 5,
    text:
      'Loved the experience. Posting and managing items was straightforward and worked perfectly in dark mode.'
  }
];

const Star = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    className={`w-5 h-5 ${filled ? 'text-warning' : 'text-base-300'}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.54a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.477a.562.562 0 01-.84-.61l1.285-5.386a.563.563 0 00-.182-.557l-4.204-3.54a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
    />
  </svg>
);

const Rating = ({ value = 5 }) => (
  <div className="flex items-center gap-1" aria-label={`Rating: ${value} out of 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} filled={n <= value} />
    ))}
  </div>
);

const Reviews = () => {
  return (
    <section className="py-12 sm:py-16 mt-20 bg-base-100 text-base-content rounded-xl">
      <div className="w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            What our users say
          </h2>
          <p className="mt-3 text-base sm:text-lg text-base-content/70">
            Real stories from people who found and recovered their belongings using FindMyStuff.
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article
              key={r.id}
              className="card bg-base-200/70 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-base-200"
            >
              <div className="card-body">
                <div className="flex items-center gap-4">
                  <img
                    src={r.avatar}
                    alt={`${r.name} avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="font-semibold leading-tight">{r.name}</h3>
                    <p className="text-sm text-base-content/70">{r.role}</p>
                  </div>
                </div>

                <p className="mt-4 text-base leading-relaxed">“{r.text}”</p>

                <div className="mt-4">
                  <Rating value={r.rating} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
