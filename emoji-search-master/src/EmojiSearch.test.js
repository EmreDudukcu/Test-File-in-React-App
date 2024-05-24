import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import EmojiList from "./emojiList.json";

describe("Emoji Search test", () => {
  //App.js is rendered before each test.
  beforeEach(() => {
    render(<App />);
  });

  test("should include the header", () => {
    //Selection is made based on the text on the screen.
    const title = screen.getByText("Emoji Search");
    //It selects those with the alt text 'img'.
    const titleImages = screen.getAllByAltText("img");
    //It checks if the title is in the DOM.
    expect(title).toBeInTheDocument();
    expect(titleImages.length).toEqual(2);
  });

  test("should has the first 20 emojies", () => {
    const firstEmojiList = EmojiList.slice(0, 19);
    firstEmojiList.map((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument;
    });
  });

  test("can filter", () => {
    //"It selects based on the text of the label."
    const input = screen.getByLabelText("Text");
    const filteredEmoji = "Heart Eyes";
    //fireEvent simulates user interactions.
    //.change() is used to change the value of form elements.
    //The part input, { target: { value: filteredEmoji } } simulates the change.
    //Here, we simulated typing "Heart Eyes" into the input.
    fireEvent.change(input, {
      target: { value: filteredEmoji },
    });
    //We selected elements that contain the text "Heart" in their alt text by writing (/Heart/i).
    expect(screen.getAllByAltText(/Heart/i).length).toEqual(2);
  });

  test("should be able to copy when clicked", () => {
    const click = screen.getByText("100");
    //"data-clipboard-text" is an HTML attribute that enables copying its value when the element is clicked.
    //Here, we traverse to the parent of the selected element and check if the value of this attribute matches the string we provided.
    expect(click.parentElement.getAttribute("data-clipboard-text")).toMatch(
      "💯"
    );
  });
});
