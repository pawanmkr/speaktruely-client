interface ThreadProps {
  threads: number[];
}

const Threads = ({ threads }: ThreadProps) => {
  return threads.map((thread) => {
    return <div>{thread}</div>;
  });
};

export default Threads;
