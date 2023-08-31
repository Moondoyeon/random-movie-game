import styled from '@emotion/styled';
import { CacheApi } from 'libs/api/http';
import Modal from 'libs/components/Modal';
import Slot from 'libs/components/Slot';
import colors from 'libs/constants/colors';
import {
  SLOTOPTION_COUNTRY,
  SLOTOPTION_TYPE,
  SLOTOPTION_YEAR,
} from 'libs/constants/slotOptions';
import { MovieData, SlotOption } from 'libs/types/game';
import { useEffect, useState } from 'react';

export default function GamePage() {
  const [isFirstEntry, setIsFirstEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState({
    country: '',
    year: '',
    type: '',
  });
  const [isSpinning, setIsSpinning] = useState({
    country: false,
    year: false,
    type: false,
  });
  const [data, setData] = useState<MovieData | null>(null);

  const formatDate = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const RANDOM_DAY = ['06', '13', '20', '27'];
    const day = RANDOM_DAY[Math.floor(Math.random() * 4)];
    const date = `${selected.year}${month}${day}`;
    return date;
  };
  const getMovieData = async () => {
    try {
      const response = await CacheApi.getMovieList({
        targetDt: formatDate(),
        multiMovieYn: selected.type,
        repNationCd: selected.country,
      });

      if (response) setData(response);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (selected.country && selected.type && selected.year) getMovieData();
  }, [selected.country, selected.type, selected.year]);

  const getSelectedOption = (name: SlotOption, num: number) => {
    if (name === 'country')
      setSelected({ ...selected, country: SLOTOPTION_COUNTRY[num][1] });
    if (name === 'year')
      setSelected({ ...selected, year: SLOTOPTION_YEAR[num][1] });
    if (name === 'type')
      setSelected({ ...selected, type: SLOTOPTION_TYPE[num][1] });
  };
  const stopSpinning = (name: SlotOption) => {
    if (name === 'country') setIsSpinning({ ...isSpinning, country: false });
    if (name === 'year') setIsSpinning({ ...isSpinning, year: false });
    if (name === 'type') setIsSpinning({ ...isSpinning, type: false });
  };
  const startSpinning = () => {
    setIsFirstEntry(false);
    setIsSpinning({
      country: true,
      year: true,
      type: true,
    });
  };

  const initGame = () => {
    setIsFirstEntry(true);
    setSelected({
      country: '',
      type: '',
      year: '',
    });
    setData(null);
  };
  return (
    <section>
      {!isSpinning.country && !isSpinning.type && !isSpinning.year && (
        <Modal
          isFirstEntry={isFirstEntry}
          startSpinning={startSpinning}
          data={data}
          isLoading={isLoading}
          selected={selected}
          initGame={initGame}
        />
      )}

      <SlotContainer>
        <Slot
          name="country"
          option={SLOTOPTION_COUNTRY}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
          isFirstEntry={isFirstEntry}
        />
        <Slot
          name="year"
          option={SLOTOPTION_YEAR}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
          isFirstEntry={isFirstEntry}
        />
        <Slot
          name="type"
          option={SLOTOPTION_TYPE}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
          isFirstEntry={isFirstEntry}
        />
      </SlotContainer>
    </section>
  );
}

const SlotContainer = styled.div`
  width: 960px;
  height: 520px;
  background-color: ${colors.inverseGrey800};
  margin: 40px 0;
  display: flex;
  justify-content: space-around;
  padding: 0 36px;
  border-radius: 10px;
`;
