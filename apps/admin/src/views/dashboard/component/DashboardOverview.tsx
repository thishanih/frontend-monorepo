import DashboardBalances from './DashboardBalances';
import DashboardStatusList from './DashboardStatusList';
import './Dashboardcard.css';

export default function DashboardOverview() {
  return (
    <section className="dashboard-card relative overflow-hidden border border-slate-200 bg-white">
      <div className="dashboard-card__aurora">
        <svg
          aria-hidden="true"
          className="dashboard-card__ribbons"
          preserveAspectRatio="none"
          viewBox="0 0 1200 900"
        >
          <defs>
            <linearGradient id="dashboard-ribbon-orange" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="55%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fb7185" />
              <animateTransform
                attributeName="gradientTransform"
                className="dashboard-card__ribbon-gradient-motion"
                dur="30s"
                repeatCount="indefinite"
                type="rotate"
                values="-3 0.5 0.5; 3 0.5 0.5; -3 0.5 0.5"
              />
            </linearGradient>
            <linearGradient id="dashboard-ribbon-pink" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="60%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#fb7185" />
              <animateTransform
                attributeName="gradientTransform"
                className="dashboard-card__ribbon-gradient-motion"
                dur="34s"
                repeatCount="indefinite"
                type="rotate"
                values="3 0.5 0.5; -3 0.5 0.5; 3 0.5 0.5"
              />
            </linearGradient>
            <linearGradient id="dashboard-ribbon-violet" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f0abfc" />
              <stop offset="52%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#8b5cf6" />
              <animateTransform
                attributeName="gradientTransform"
                className="dashboard-card__ribbon-gradient-motion"
                dur="38s"
                repeatCount="indefinite"
                type="rotate"
                values="-2 0.5 0.5; 2 0.5 0.5; -2 0.5 0.5"
              />
            </linearGradient>
            <linearGradient id="dashboard-ribbon-blue" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a5b4fc" />
              <stop offset="55%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#6366f1" />
              <animateTransform
                attributeName="gradientTransform"
                className="dashboard-card__ribbon-gradient-motion"
                dur="42s"
                repeatCount="indefinite"
                type="rotate"
                values="2 0.5 0.5; -2 0.5 0.5; 2 0.5 0.5"
              />
            </linearGradient>
          </defs>

          <path
            d="M-260 -120 C40 40 80 250 240 470 C390 680 430 820 540 1020 L160 1020 C100 800 30 650 -100 450 C-220 250 -300 80 -260 -120 Z"
            fill="url(#dashboard-ribbon-orange)"
          />
          <path
            d="M-80 -130 C250 50 310 260 470 500 C610 730 650 850 760 1030 L500 1030 C420 820 340 660 230 480 C100 270 20 90 -80 -130 Z"
            fill="url(#dashboard-ribbon-pink)"
          />
          <path
            d="M80 -120 C390 80 480 270 610 500 C760 760 790 880 900 1020 L670 1020 C560 790 500 650 390 460 C260 240 180 100 80 -120 Z"
            fill="url(#dashboard-ribbon-violet)"
          />
          <path
            d="M280 -120 C560 80 660 290 790 500 C930 730 990 870 1100 1020 L900 1020 C780 780 700 650 590 450 C450 210 380 80 280 -120 Z"
            fill="url(#dashboard-ribbon-blue)"
          />

          <path
            className="dashboard-card__ribbon-highlight"
            d="M-40 -40 C180 160 180 300 350 520 C470 680 510 820 560 930"
            fill="none"
          />
          <path
            className="dashboard-card__ribbon-highlight"
            d="M170 -40 C400 170 410 310 560 530 C670 700 720 820 770 930"
            fill="none"
          />
          <path
            className="dashboard-card__ribbon-highlight"
            d="M400 -40 C600 160 640 320 770 530 C850 670 920 820 960 930"
            fill="none"
          />
          <path
            className="dashboard-card__ribbon-wave-line"
            d="M-40 -40 C180 160 180 300 350 520 C470 680 510 820 560 930"
            fill="none"
          />
          <path
            className="dashboard-card__ribbon-wave-line"
            d="M170 -40 C400 170 410 310 560 530 C670 700 720 820 770 930"
            fill="none"
          />
          <path
            className="dashboard-card__ribbon-wave-line"
            d="M400 -40 C600 160 640 320 770 530 C850 670 920 820 960 930"
            fill="none"
          />
        </svg>
        <span className="dashboard-card__stripe-sheen" />
      </div>
      <div className="absolute inset-0 bg-white/0" />

      <div className="dashboard-card__content relative z-10 p-6 text-slate-950 sm:p-8 lg:p-10">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-3xl font-semibold uppercase text-slate-950">
                  Order status overview
                </p>
                <p className="mt-2 text-sm text-slate-700/80">Total orders across all statuses</p>
              </div>
            </div>
            <DashboardStatusList />
          </div>
          <DashboardBalances />
        </div>
      </div>
    </section>
  );
}
