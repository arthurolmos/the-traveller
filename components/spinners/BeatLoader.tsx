import BeatLoader from 'react-spinners/BeatLoader';

interface Props {
  loading: boolean;
}

export function BeatLoaderSpinner({ loading = false }: Props) {
  return (
    <BeatLoader
      color="#c86420"
      loading={loading}
      size={20}
      speedMultiplier={0.5}
    />
  );
}
