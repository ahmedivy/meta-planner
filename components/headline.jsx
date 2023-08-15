function Headline({ words, gradients, currIndex }) {
    return (
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-center">
        <span className="flex flex-col lg:block">
          {words.map((word, index) => (
            <span
              key={index}
              className={`${
                index === currIndex
                  ? "bg-gradient-to-r " +
                    gradients[currIndex] +
                    " bg-clip-text text-transparent"
                  : "text-foreground"
              } transition-bg duration-500 ease-in-out`}
            >
              {word}
            </span>
          ))}
        </span>
      </h1>
    );
  }
  
  export default Headline;