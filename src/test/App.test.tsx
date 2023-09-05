import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { http } from 'libs/api/http';

describe('App test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('"START" 버튼을 누르면 "슬롯" 버튼이 활성화 된다', async () => {
    const user = userEvent.setup();
    render(<App />);

    user.click(screen.getByText('START'));

    await waitFor(() => {
      expect(screen.queryByText('START')).not.toBeInTheDocument();
    });

    const slotButton1 = screen.queryByRole('button', {
      name: 'country',
    });
    const slotButton2 = screen.queryByRole('button', {
      name: 'type',
    });
    const slotButton3 = screen.queryByRole('button', {
      name: 'year',
    });

    expect(slotButton1).toBeEnabled();
    expect(slotButton2).toBeEnabled();
    expect(slotButton3).toBeEnabled();
  });

  test('"슬롯" 버튼을 전부 누르면 선택된 값이 서버로 전송된다', async () => {
    const user = userEvent.setup();
    const spyOnFetch = jest.spyOn(http, 'get');
    render(<App />);

    user.click(screen.getByText('START'));
    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    const results = await waitFor(() => spyOnFetch.mock.results[0].value, {
      timeout: 5000,
    });

    expect(results.boxOfficeResult.weeklyBoxOfficeList).toHaveLength(5);
    expect(spyOnFetch).toHaveBeenCalled();
  });

  test('“처음으로” 버튼을 누르면 “START” 버튼이 나타난다.', async () => {
    const user = userEvent.setup();
    render(<App />);

    user.click(screen.getByText('START'));
    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(
      () => {
        expect(screen.queryByText('처음으로')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    user.click(await screen.findByText('처음으로'));

    await waitFor(() => {
      expect(screen.queryByText('START')).toBeInTheDocument();
    });
  });
});
