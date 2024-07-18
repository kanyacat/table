interface IProps {
  type: string;
}

export const PokemonType = (props: IProps) => {
  const { type } = props;
  return <strong className={type + "__type"}>{type}</strong>;
};
