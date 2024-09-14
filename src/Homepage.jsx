import "./index.css";
function HomePage() {
  return (
    <body>
      <header>
        <h1>Welcome to Task Tracker</h1>
        <p>Your solution for managing tasks efficiently.</p>
        <a href="/tasktracker" class="btn">
          Start Using Task Tracker
        </a>
      </header>
      <section>
        <h2>Features</h2>
        <ul>
          <li>Create and manage tasks</li>
          <li>Edit and mark tasks as complete</li>
          <li>Tasks saved with localStorage</li>
        </ul>
      </section>
      <footer>
        <p>&copy; 2024 Egbu Joy. All rights reserved.</p>
      </footer>
    </body>
  );
}

export default HomePage;
