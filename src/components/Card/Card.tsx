import React, { useEffect, useState } from 'react';
import { BreadCrumbs } from '../../UI/BreadCrumbs/BreadCrumbs';
import { useParams } from 'react-router-dom';
import { CardType } from '../../types/schemas';
import { cards } from '../../data/cards';
import CardUI from '../../UI/CardUI';

export const Card = () => {
  const params = useParams();
  const [cardState, setCardState] = useState<CardType | null>(null);

  useEffect(() => {
    if (params.id) {
      setCardState(
        cards.find((card) => String(card.cardID) === params.id) || null,
      );
    }
  }, [params.id]);

  return (
    <div>
      <BreadCrumbs />
      {cardState && <CardUI card={cardState} />}
    </div>
  );
};
