import CharacterList from "../Components/CharactersList";

export default async function Home() {
  return (
    <main className="">
      <section className="py-8">
        <div className="container ml-auto mr-auto">
          <CharacterList />
        </div>
      </section>
    </main>
  );
}
