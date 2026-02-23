import React from "react";

const MobileLayout: React.FC<{ children: React.ReactNode; hideNav?: boolean }> = ({ children, hideNav }) => {
  return (
    <div className="flex justify-center min-h-screen bg-muted/50">
      <div className="w-full max-w-[430px] min-h-screen bg-background relative shadow-xl">
        <div className={hideNav ? "" : "pb-20"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
