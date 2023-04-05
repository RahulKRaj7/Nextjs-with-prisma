import { trpc } from '../utils/trpc';

export default function IndexPage() {
  const hello = trpc.hello.useQuery({ text: 'client' });
  //const insert = trpc.insertUser.useQuery({text: 'hello'});
  const users = trpc.getUser.useQuery({text: 'hello'});
  console.log("users");
  console.log(users.data?.greeting);
  if (!hello.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <p>{hello.data.greeting}</p>
    </div>
  );
}