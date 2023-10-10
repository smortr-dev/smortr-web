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
    </>
  );
}
