import BackDrop from './BackDrop';
import Spinner from './Spinner';

export default function Loading() {
  return (
    <BackDrop whiteBoard={false}>
      <Spinner />
    </BackDrop>
  );
}
