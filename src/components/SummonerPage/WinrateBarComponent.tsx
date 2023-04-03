interface Props {
  width: string;
}

const WinrateBarComponent: React.FC<Props> = ({ width }) => {
  return (
    <div className='summonerInfo_stats_container_progressbar_bar' style={{ width }} />
  );
};
export default WinrateBarComponent