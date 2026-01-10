

export function WorkInProgressPopup({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-xl font-bold mb-4">Website Sedang Dikerjakan</h2>
                <p>Website ini sedang dalam proses perbaikan. Mohon maaf atas ketidaknyamanannya.</p>
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Tutup
                </button>
            </div>
        </div>
    );
}
