const page = ({ children }) => (
  <>
    <div>
      {children}
    </div>
    <style jsx>{`
      div {
        height: 100vh;
        width: 100vw;
      }
    `}</style>
  </>
);

export default page;
