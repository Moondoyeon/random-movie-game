import { css } from '@emotion/react';
import { http } from 'libs/api/http';
import Slot from 'libs/components/Slot';
import colors from 'libs/constants/colors';
import {
  SLOTOPTION_COUNTRY,
  SLOTOPTION_TYPE,
  SLOTOPTION_YEAR,
} from 'libs/constants/slotOptions';
import { useEffect, useState } from 'react';

export type SlotOption = 'country' | 'year' | 'type';

export default function GamePage() {
  const [isTrue] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({
    country: '',
    year: '',
    type: '',
  });
  const [isSpinning, setIsSpinning] = useState({
    country: true,
    year: true,
    type: true,
  });

  console.log(selected, isSpinning);
  const parseDate = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 29) + 1).padStart(2, '0');
    const date = `${selected.year}${month}${day}`;
    return date;
  };

  const fetchRandomMovie = async () => {
    try {
      return await http.get('', {
        targetDt: parseDate(),
        itemPerPage: 3,
        multiMovieYn: selected.type,
        repNationCd: selected.country,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      if (!isSpinning.country && !isSpinning.type && !isSpinning.year) {
        setIsLoading(true);
        const result = await fetchRandomMovie();
        setIsLoading(false);
        console.log(result);
      }
    })();
  }, [isSpinning]);

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
  return (
    <section>
      {isTrue && <div>halted : start button and backModal</div>}
      {isLoading && <div>all selected && halted : loading indicator</div>}
      <div
        css={css`
          width: 960px;
          height: 520px;
          background-color: ${colors.inverseGrey800};
          margin: 40px 0;
          display: flex;
          justify-content: space-around;
          padding: 0 36px;
          border-radius: 10px;
        `}
      >
        <Slot
          name="country"
          option={SLOTOPTION_COUNTRY}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
        />
        <Slot
          name="year"
          option={SLOTOPTION_YEAR}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
        />
        <Slot
          name="type"
          option={SLOTOPTION_TYPE}
          getSelectedOption={getSelectedOption}
          stopSpinning={stopSpinning}
          isSpinning={isSpinning}
        />
      </div>
    </section>
  );
}
