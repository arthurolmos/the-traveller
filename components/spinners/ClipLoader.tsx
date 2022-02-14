import ClipLoader from 'react-spinners/ClipLoader';

interface Props {
  loading: boolean;
}

export function ClipLoaderSpinner({ loading = false }: Props) {
  return (
    <ClipLoader
      color="#c86420"
      loading={loading}
      size={80}
      speedMultiplier={0.3}
    />
  );
}
