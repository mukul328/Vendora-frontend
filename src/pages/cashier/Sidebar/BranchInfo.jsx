
import { useSelector } from "react-redux";

const BranchInfo = () => {
  const { branch: reduxBranch, loading, error } = useSelector((state) => state.branch);
  const { userProfile } = useSelector((state) => state.user);

  const activeBranch = reduxBranch || userProfile?.branch;

  if (loading && !activeBranch) return <p className="text-xs text-muted-foreground p-2">Loading branch info...</p>;
  if (error && !activeBranch) return <p className="text-xs text-red-500 p-2">Error: {error}</p>;
  if (!activeBranch) return null;

  return (
    <div className="mt-4 p-3 bg-secondary rounded-md text-sm">
      <h3 className="font-semibold mb-1">Branch Info:</h3>
      <p>
        <strong>Name:</strong> {activeBranch.name || "N/A"}
      </p>
      {activeBranch.address && (
        <p>
          <strong>Address:</strong> {activeBranch.address}
        </p>
      )}
    </div>
  );
};

export default BranchInfo;
