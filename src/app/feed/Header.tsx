/* eslint-disable @next/next/no-img-element */
export default function Header() {
  return (
    <>
      <div className="flex justify-between pb-6 pt-4">
        <div className="inline-block h-10 w-10">
          <img
            src="/feed_logo.svg"
            className="inline-block object-cover"
            alt="feed-logo"
          />
        </div>
        <div className="inline-block [&>*]:mr-4">
          <img
            src="/feed_search.svg"
            alt="feed-search"
            className="p-2 h-10 w-10 inline-block "
          />
          <img
            src="/feed_notification.svg"
            alt="feed-notification"
            className="p-2 h-10 w-10 inline-block "
          />
          <div className="inline-block">
            <div className="h-10 w-10 flex justify-center items-center rounded-full text-center bg-[#DD5D33] text-white ">
              <div className="inline-block">JW</div>
            </div>
          </div>
          {/* <img src="/" */}
        </div>
      </div>
      <div className="w-full relative rounded-[6.25rem] flex border-[0.06rem] border-black justify-stretch">
        <div className="inline-block w-[90%] h-full">
          <div className="w-full flex">
            <img
              src="/feed_search_bar.svg"
              className="inline-block p-3 h-12 w-12"
              alt="feed-search-logo"
            />
          </div>
        </div>
        <div className="relative w-[10%] border-black border-l-[0.06rem] flex items-center justify-center">
          <div className="inline-block">Hello</div>
        </div>
      </div>
      
    </>
  );
}
