import clsx from "clsx";
import { LeftMenu } from "../components/LeftMenu";
import SideComments from "../components/SideComments";
import { Api } from '../components/Api/index';
import { useEffect, useState } from "react";
import { ResponseComment } from "../components/Api/response";

interface IMainLayoutProps {
  contentFullWidth?: boolean;
  hideComments?: boolean;
  hideMenu?: boolean;
  className?: string;
}

export const MainLayout: React.FC<IMainLayoutProps> = ({ children, contentFullWidth, hideComments, hideMenu, className }) => {

  const [comment, setComment] = useState<ResponseComment[]>([]);

  useEffect(() => {

    (async () => { setComment(await Api().comment.top()); })();

  }, []);

  return (
    <div className={clsx("wrapper", className)}>
      {!hideMenu && <div className="leftSide">
        <LeftMenu />
      </div>}
      <div className={clsx("content", { "content--full": contentFullWidth })}>
        {children}
      </div>
      {!hideComments && <div className="rightSide">
        <SideComments comments={comment} />
      </div>}
    </div>
  );

};

