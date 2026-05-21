'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { characterRepository } from '@/entities/character';
import { useUserStore } from '@/entities/user';
import { useT } from '@/shared/i18n/use-t';
import { ROUTES } from '@/shared/config/routes';
import { Button } from '@/shared/ui/button';
import { haptic } from '@/shared/lib/telegram';
import { analytics } from '@/shared/services/analytics';
import { CharacterCard } from '@/widgets/character-grid/character-card';

export function SelectCharacter() {
  const t = useT();
  const router = useRouter();
  const setInitial = useUserStore((s) => s.setInitialCharacter);
  const { data: characters = [] } = useQuery({
    queryKey: ['characters'],
    queryFn: characterRepository.list,
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sorted = useMemo(
    () =>
      [...characters].sort((a, b) =>
        Number(b.unlockedFromStart) - Number(a.unlockedFromStart),
      ),
    [characters],
  );

  const onPick = (id: string, unlocked: boolean) => {
    if (!unlocked) {
      haptic.warning();
      return;
    }
    haptic.selection();
    setSelectedId(id);
  };

  const confirm = () => {
    if (!selectedId) return;
    haptic.success();
    analytics.track({ name: 'character_selected_initial', characterId: selectedId });
    setInitial(selectedId);
    router.replace(ROUTES.home);
  };

  return (
    <div className="tg-screen pb-[max(2rem,env(safe-area-inset-bottom))]">
      <header className="pt-10 pb-6 text-center">
        <h1 className="text-3xl font-black tracking-tight">{t.character.pickTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t.character.pickHint}</p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {sorted.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            locked={!c.unlockedFromStart}
            selected={selectedId === c.id}
            onClick={() => onPick(c.id, c.unlockedFromStart)}
            showAbility={false}
          />
        ))}
      </div>

      <div className="sticky bottom-0 mt-8 -mx-4 bg-gradient-to-t from-background via-background to-transparent px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6">
        <Button
          size="block"
          disabled={!selectedId}
          onClick={confirm}
          hapticType="medium"
        >
          {selectedId ? t.character.pick : t.common.continue}
        </Button>
      </div>
    </div>
  );
}
