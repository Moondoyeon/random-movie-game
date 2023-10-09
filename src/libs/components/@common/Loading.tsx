import BackDrop from './BackDrop';
import Spinner from './Spinner';

export default function Loading({ whiteBoard }: { whiteBoard: boolean }) {
  return (
    <BackDrop whiteBoard={whiteBoard}>
      <Spinner />
    </BackDrop>
  );
}
