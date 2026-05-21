const STEPS = [
  { icon: '✅', label: 'Выполняй задания', hint: 'Получай героев за ежедневные задания' },
  { icon: '📦', label: 'Открывай колоды', hint: 'Находи героев в карточках разной редкости' },
  { icon: '🪙', label: 'Копи монеты', hint: 'Покупай героев в магазине' },
  { icon: '🌟', label: 'Участвуй в ивентах', hint: 'Уникальные герои за события' },
];

export function HowToGet() {
  return (
    <section className="rounded-3xl border border-white/5 bg-zinc-950/70 p-5">
      <h3 className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
        Как получить персонажей?
      </h3>
      <ul className="grid grid-cols-2 gap-2">
        {STEPS.map((s) => (
          <li
            key={s.label}
            className="flex flex-col items-center gap-1 rounded-2xl border border-white/5 bg-white/[0.02] p-3 text-center"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-white/5 text-lg">
              {s.icon}
            </span>
            <div className="text-xs font-extrabold text-white">{s.label}</div>
            <div className="text-[10px] leading-tight text-white/55">{s.hint}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}
