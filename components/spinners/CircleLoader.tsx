import CircleLoader from 'react-spinners/CircleLoader';

interface Props {
  loading: boolean;
}

export function CircleLoaderSpinner({ loading = false }: Props) {
  return (
    <CircleLoader
      color="#c86420"
      loading={loading}
      size={80}
      // speedMultiplier={0.5}
    />
  );
}
