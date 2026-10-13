export default function Toast({ msg, kind }) {
  return <div role="status" className={`toast show ${kind || ''}`}>{msg}</div>;
}
